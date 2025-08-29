import BackButton from "@components/BackButton";
import DayWorkout from "./DayWorkout";
import { redirect } from "next/navigation";

async function fetchProgram(params) {
    const programPromise = await fetch(`https://novofitclub.com/wp-json/wp/v2/program/${params.ID}`, { next: { revalidate: 10 } });
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
    const program = res;

    return {
        title:  program.acf.program_name || "Program",
    };
}

export default async function Page({ params, searchParams }) {
    // For now, we'll expect the member slug to be passed as a query parameter
    // In a full implementation, this would come from the user's session
    const memberSlug = searchParams?.member;
    
    console.log('Workout page - memberSlug:', memberSlug);
    console.log('Workout page - searchParams:', searchParams);
    
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