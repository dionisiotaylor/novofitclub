
import Link from "next/link";

async function getAllMembers() {
    const allMembers = await fetch('https://novofitclub.com/wp-json/wp/v2/member', { next: { revalidate: 10 } });
    const members = await allMembers.json();
    return members;
};

export default async function MemberList() {

    const members = await getAllMembers();
    return (
        <>
            <h1>Members</h1>
            <ul>
                { members.map( (member, index) => (
                    <li key={ index }>
                        <Link href={`/member/${member.slug}`}>
                        { member.title.rendered }
                        </Link>

                        {member.acf && member.acf.programs && (
                            <ul>
                                {member.acf.programs.map((program, programIndex) => (
                                <li key={programIndex}>
                                    {program.single_program.map((singleProgram, singleProgramIndex) => (
                                        <div key={singleProgramIndex}>
                                            <h3>{singleProgram.post_title}</h3>
                                            <p>ID: {singleProgram.ID}</p>
                                        </div>
                                    ))}
                                    {/* <button onClick={() => signOut()}>Sign Out</button> */}
                                </li>
                                ))}
                            </ul>
                        )}  
                    </li>
                ))}
                
            </ul>
        </>
    );
};