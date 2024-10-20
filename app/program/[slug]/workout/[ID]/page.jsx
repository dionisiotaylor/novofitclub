import BackButton from "@components/BackButton";
import DayWorkout from "./DayWorkout";

async function fetchProgram( params ) {
    const programPromise = await fetch(`https://novofitclub.com/wp-json/wp/v2/program/${params.ID}?_fields=acf.workout`);
    const program = await programPromise.json();
    console.log(program);
    return program;
}

export default async function Page({ params }) {
    const res = await fetchProgram(params);
    const program = res;
    
    return (
        <>
            <header className="header">
                <div className="wrapper">
                    <BackButton />
                </div>
            </header>
            <DayWorkout program={program} />
        </>
    );
}
