import Link from "next/link";
import IconProgram from "../../../assets/icons/icon-program.svg";
import ChevronMini from "../../../assets/icons/chevron-mini.svg";

// Fetch member data
async function fetchMember(slug) {
    const res = await fetch(`https://novofitclub.com/wp-json/wp/v2/member?slug=${slug}`, { next: { revalidate: 10 } });
    const memberData = await res.json();
    return memberData[0]; // Return the first item if the array has data
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const member = await fetchMember(params.slug);
    return {
        title: member ? `${member.title.rendered} - Member Page` : "Member Page",
    };
}

// Main component
export default async function MemberPage({ params }) {
    const member = await fetchMember(params.slug);

    console.log('Member page - params.slug:', params.slug);
    console.log('Member page - member:', member);

    if (!member) {
        return <div>Member not found.</div>; // Handle not-found case
    }

    // Check if member status is expired
    const isExpired = member.acf?.status === 'expired';

    console.log('Member page - isExpired:', isExpired);

    if (isExpired) {
        return (
            <>
                <header className="header">
                    <div className="wrapper">
                        <h2 className="header__title">{member.title.rendered}</h2>
                    </div>
                </header>

                <div className="wrapper">
                    <div className="sub-header">
                        <h2>Membresía Expirada</h2>
                        <p>Tu membresía ha expirado. Por favor visita el gimnasio para renovar tu acceso y continuar con tus entrenamientos.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <header className="header">
                <div className="wrapper">
                    <h2 className="header__title">{member.title.rendered}</h2>
                </div>
            </header>

            <div className="wrapper">
                <div className="sub-header">
                    <h2>Rutinas</h2>
                    <p>Aquí se encuentran los rutinas.</p>
                </div>

                {member.acf && member.acf.programs && (
                    <div className="programs">
                        <ul>
                            {member.acf.programs.map((program, programIndex) => (
                                <li key={programIndex}>
                                    {program.single_program.map((singleProgram, singleProgramIndex) => (
                                        <Link href={`/program/${singleProgram.post_name}?member=${params.slug}`} className="single-item" key={singleProgramIndex}>
                                            <span className="single-item__wrap">
                                                <span className="single-item__icon"><IconProgram/></span>
                                                <span>
                                                    <h2 className="single-item__title">{ singleProgram.post_title }</h2>
                                                    <div className="single-item__meta">{/* INIT DATE */}</div>
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
