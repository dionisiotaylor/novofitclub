import YouTubeVideo from "../../../components/YouTubeVideo";
import BackButton from '@components/BackButton';

async function fetchExercise(params) {
    const exercisePromise = await fetch(`https://novofitclub.com/wp-json/wp/v2/exercise?slug=${params.slug}`);
    const exercise = exercisePromise.json()

    return exercise;
}

export default async function Page({ params }) {
    const res = await fetchExercise(params);
    const exercise = res[0];
    const youtubeUrl = exercise.acf?.video_url;

    // Extract YouTube video URL from the program ACF field
    const videoIdMatch = youtubeUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;


    return (
        <>
            <header className="header">
                <div className="wrapper">
                    <BackButton />
                </div>
            </header>

            <div className="video-panel">
                <YouTubeVideo videoId={videoId} />
            </div>
        </>
    );
}