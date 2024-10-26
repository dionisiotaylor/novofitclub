
import IconProgram from "@assets/icons/icon-program.svg";
import ChevronMini from "@assets/icons/chevron-mini.svg";
import Link from "next/link";
import { slugify } from "../../../utils/slugify";
import BackButton from '@components/BackButton';

async function fetchProgram(params) {
    const programPromise = await fetch(`https://novofitclub.com/wp-json/wp/v2/program?slug=${params.slug}` , { next: { revalidate: 10 } });
    const program = await programPromise.json();
    
    return program;
}

export async function generateMetadata({ params }) {
    const res = await fetchProgram(params);
    const program = res[0];

    return {
        title: program ? program.acf.program_name : "Program",
    };
}

export default async function Page({ params }) {
    const res = await fetchProgram(params);
    const program = res[0];

    return (
        <>
            <header className="header">
                <div className="wrapper">
                    <BackButton />
                    <h2 className="header__title">{program.acf.program_name}</h2>
                </div>
            </header>

            <div className="wrapper">
                <div className="sub-header">
                    <h2>{program.acf.program_name}</h2>
                    <p>Fecha de cambio de rutina: <strong>{ program.acf.end_date}</strong></p>
                </div>
            
                {program.acf && program.acf.workout && (
                    <>
                        {program.acf.workout.map((workout, workoutIndex) => (
                            <Link 
                                key={workoutIndex} 
                                href={{
                                    pathname: `/program/${slugify(program.title.rendered)}/workout/${program.id}`,
                                    query: { workout_name: slugify(workout.workout_name) }
                                }} 
                                className="single-item">
                                <span className="single-item__wrap">
                                    <span className="single-item__icon"><IconProgram/></span>
                                    <span>
                                        <h2 className="single-item__title">{ workout.workout_name }</h2>
                                        <div className="single-item__meta">{ workout.workout_label}</div>
                                    </span>
                                </span>
                                <span className="arrow"><ChevronMini/></span>
                            </Link>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
