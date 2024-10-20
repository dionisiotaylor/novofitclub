import Link from "next/link";
import IconProgram from "../../../assets/icons/icon-program.svg";
import ChevronMini from "../../../assets/icons/chevron-mini.svg";

async function fetchMember(params) {
    const memberPromise = await fetch(`http://novo-fit-club-workouts.local/wp-json/wp/v2/member?slug=${params.slug}`);
    const member = await memberPromise.json();
    
    return member;
}

export default async function Page({params}) {
    const res = await fetchMember(params);
    const member = res[0];
    return (
        <>
            <header className="header">
                <div className="wrapper">
                    {member.title.rendered}
                </div>
            </header>

            <div className="wrapper">
                <div className="sub-header">
                    <h2>Rutinas</h2>
                    <p>Aquí se encuentran los rutinas:</p>
                </div>

                {member.acf && member.acf.programs && (
                    <div className="programs">
                        <ul>
                            {member.acf.programs.map((program, programIndex) => (
                                <li key={programIndex}>
                                    {program.single_program.map((singleProgram, singleProgramIndex) => (
                                        <Link href={`/program/${singleProgram.post_name}`} className="single-item" key={singleProgramIndex}>
                                            <span className="single-item__wrap">
                                                <span className="single-item__icon"><IconProgram/></span>
                                                <span>
                                                    <h2 className="single-item__title">{ singleProgram.post_title }</h2>
                                                    <div className="single-item__meta">{/*INIT DATE*/}</div>
                                                </span>
                                            </span>
                                            <span className="arrow"><ChevronMini/></span>
                                        </Link>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}