
import IconProgram from "@assets/icons/icon-program.svg";
import ChevronMini from "@assets/icons/chevron-mini.svg";
import Link from "next/link";
import { slugify } from "../../../utils/slugify";
import BackButton from '@components/BackButton';
import { redirect } from "next/navigation";

async function fetchProgram(params) {
    const programPromise = await fetch(`https://novofitclub.com/wp-json/wp/v2/program?slug=${params.slug}` , { next: { revalidate: 10 } });
    const program = await programPromise.json();
    
    return program;
}

// For now, we'll implement a simpler check - this would need to be enhanced with proper session management
async function fetchMemberBySlug(memberSlug) {
    try {
        const res = await fetch(`https://novofitclub.com/wp-json/wp/v2/member?slug=${memberSlug}`, { next: { revalidate: 10 } });
        const memberData = await res.json();
        return memberData[0];
    } catch (error) {
        console.error('Error fetching member:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const res = await fetchProgram(params);
    const program = res[0];

    return {
        title: program ? program.acf.program_name : "Program",
    };
}

export default async function Page({ params, searchParams }) {
    // For now, we'll expect the member slug to be passed as a query parameter
    // In a full implementation, this would come from the user's session
    const memberSlug = searchParams?.member;
    
    console.log('Program page - memberSlug:', memberSlug);
    console.log('Program page - searchParams:', searchParams);
    
    if (!memberSlug) {
        // If no member is specified, redirect to home
        console.log('No member slug found, redirecting to home');
        redirect('/');
        return;
    }

    // Fetch member data to check status
    const member = await fetchMemberBySlug(memberSlug);
    
    console.log('Fetched member:', member);
    console.log('Member status:', member?.acf?.status);
    
    if (!member) {
        console.log('Member not found, redirecting to home');
        redirect('/');
        return;
    }

    if (member.acf?.status === 'expired') {
        console.log('Member expired, redirecting to member page:', `/member/${member.slug}`);
        redirect(`/member/${member.slug}`);
        return;
    }

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
                                    query: { 
                                        workout_name: slugify(workout.workout_name),
                                        member: memberSlug 
                                    }
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
