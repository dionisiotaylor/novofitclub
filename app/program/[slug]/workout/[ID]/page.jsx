import BackButton from "@components/BackButton";
import DayWorkout from "./DayWorkout";

async function fetchProgram(params) {
    const programPromise = await fetch(`https://novofitclub.com/wp-json/wp/v2/program/${params.ID}`, { next: { revalidate: 10 } });
    const program = await programPromise.json();

    return program;
}

export async function generateMetadata({ params }) {
    const res = await fetchProgram(params);
    const program = res;

    return {
        title:  program.acf.program_name || "Program",
    };
}

export default async function Page({ params }) {
    const res = await fetchProgram(params);
    const program = res;

    return (
        <>
            <header className="header">
                <div className="wrapper">
                    <BackButton />
                    <h2 className="header__title">{program.acf.program_name}</h2>
                </div>
            </header>
            <DayWorkout program={program.acf.workout} />
        </>
    );
}