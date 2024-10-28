"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { slugify } from "../../../../../utils/slugify";
import { useSearchParams } from 'next/navigation';
import IconRepeat from "@assets/icons/icon-repeat.svg";
import IconClock from "@assets/icons/icon-clock.svg";
import IconPlay from "@assets/icons/icon-play.svg";


export default function DayWorkout(props) {
    const searchParams = useSearchParams();
    const workoutDay = searchParams.get('workout_name');

    const workouts = props.program;
    return (
        <>
            <div className="wrapper">
                <div className="sub-header">
                    { workouts.map(( workout, workoutIndex ) => (
                        slugify(workout.workout_name) === workoutDay && (
                            <div key={workoutIndex}>
                                <h2>{ workout.workout_name }</h2>
                                <p>{ workout.workout_label}</p>
                            </div>
                        )
                    ))}
                </div>

                {workouts.map((workout, workoutIndex) => (
                    slugify(workout.workout_name) === workoutDay && (
                        <div key={workoutIndex} className="day" >
                            {workout.day.map((day, dayIndex) => (
                                <React.Fragment key={dayIndex}>
                                    {day.acf_fc_layout === "group_exercises" ? (
                                        Array.isArray(day.exercises) && day.exercises.length > 0 ? (
                                            <div className="group-exercises">
                                                <div className="group__header">
                                                    <h3 className='group__header-title'>{day.group_name || "Unnamed Group"}</h3>
                                                    <span className='group__header-label'>{ day.rounds }</span>
                                                </div>
                                                {day.exercises.map((exerciseGroup, exerciseGroupIndex) => {
                                                    const hasExercises = Array.isArray(exerciseGroup.exercise) && exerciseGroup.exercise.length > 0;
                                                    return hasExercises ? (
                                                        <React.Fragment key={exerciseGroupIndex}>
                                                            {/* Exercise-level information */}
                                                            {exerciseGroup.exercise.map((exercise, exerciseIndex) => (
                                                                <Link key={exerciseIndex} className="exercise" href={`/exercise/${exercise.post_name}`}>
                                                                    <div className="exercise__thumbnail">
                                                                        <span className="exercise__play"><IconPlay/></span>
                                                                        <Image
                                                                            src={`https://img.youtube.com/vi/${exercise.post_excerpt}/0.jpg`}
                                                                            alt={exercise.post_title}
                                                                            width={120}
                                                                            height={90}
                                                                        />
                                                                    </div>
                                                                    <div className='exercise__info'>
                                                                        <h2 className="exercise__title">{exercise.post_title }</h2>
                                                                        <div className="exercise__meta">
                                                                            {/* Access objective and break from the parent exerciseGroup object */}
                                                                            <span><IconRepeat />{ exerciseGroup.objective }</span>
                                                                            <span><IconClock />{ exerciseGroup.break }</span>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </React.Fragment>
                                                    ) : null; // Don't render anything if there are no exercises
                                                })}

                                            </div>
                                        ) : (
                                            <p>No exercises available</p>
                                        )
                                    ) : null}

                                    {day.acf_fc_layout === "single_exercise" ? (
                                        Array.isArray(day.exercise) && day.exercise.length > 0 ? (
                                            <div className="single-exercise">
                                                {day.exercise.map((exercise, exerciseIndex) => (
                                                    <Link key={exerciseIndex} className="exercise" href={`/exercise/${exercise.post_name}`}>
                                                        <div className="exercise__thumbnail">
                                                            <span className="exercise__play"><IconPlay/></span>
                                                            <Image
                                                                src={`https://img.youtube.com/vi/${exercise.post_excerpt}/0.jpg`}
                                                                alt={exercise.post_title}
                                                                width={120}
                                                                height={90}
                                                            />
                                                        </div>
                                                        <div className='exercise__info'>
                                                            <h2 className="exercise__title">{exercise.post_title }</h2>
                                                            <div className="exercise__meta">
                                                                <span><IconRepeat />{ day.exercise.objective }</span>
                                                                <span><IconClock/>{ day.exercise.break }</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No single exercises available</p>
                                        )
                                    ) : null}
                                </React.Fragment>
                            ))}
                        </div>
                    )
                ))}
                
            </div>
        </>
    );
}