import '../styles/pages/ProjectPage.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getDataFromFirestore} from "../utils/firestoreUtils.js";
import {hexToRGBA} from "../utils/colorUtils.js";
import Loading from "../components/Loading.jsx";
import Tooltip from "../components/Tooltip.jsx";
import {calculateTimeElapsed, convertFirestoreTimestampToJSDate, formatMonthYear} from "../utils/dateTimeUtils.js";
import HighlightCard from "../components/HighlightCard.jsx";
import {getIconByName} from "../utils/iconUtils.jsx";
import {FaMountainSun} from "react-icons/fa6";
import AnimatedBackButton from "../components/AnimatedBackButton.jsx";
import {motion} from "framer-motion";
import ScrollToTop from "../components/ScrollToTop.jsx";

const ProjectPage = () => {
    const {projectId} = useParams();
    const [projectInfo, setProjectInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const transformData = (data) => {
        const userInfo = data[projectId];
        return {
            userID: projectId,
            ...userInfo
        };
    };

    useEffect(() => {
        getDataFromFirestore({collectionName: 'projects', documentId: projectId}).then(data => {
            setProjectInfo(transformData(data));
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <ScrollToTop/>
            {(isLoading || !projectInfo || !projectInfo.color) ? <Loading/> :
            <div className='project-page pt-16 md:pt-28 2xl:pt-44 pb-16 md:pb-40 2xl:pb-60 relative bg-no-repeat bg-custom-dark flex flex-col items-center text-custom-light'
                style={projectInfo.color ? {'--project-color': hexToRGBA(projectInfo.color, 0.5)} : {}}>
                <div className="fixed top-0 left-0 flex w-full justify-start items-center py-4 px-4 md:py-8 md:px-12 2xl:py-12">
                    <AnimatedBackButton/>
                </div>
                <ProjectPageHero projectInfo={projectInfo}/>
                {(projectInfo.overview) && <ProjectPageOverview projectInfo={projectInfo}/>}
                {(projectInfo.highlights) && <ProjectPageHighlights projectInfo={projectInfo}/>}
            </div>
            }
        </>
    )
}

const ProjectPageHero = ({projectInfo}) => {
    return (
        <div className="flex flex-col justify-start items-center relative w-page-default pt-12 md:pt-0 md:w-page-md lg:w-page-lg 2xl:w-page-2xl gap-y-4">
            <div
                className="flex justify-center items-center text-5xl lg:text-6xl 2xl:text-7xl project-page-title font-semibold text-center">{projectInfo.title && projectInfo.title}</div>
            <div
                className="flex justify-center items-center text-base lg:text-lg 2xl:text-xl font-normal text-custom-light text-opacity-50 text-center">
                {projectInfo.association && projectInfo.association} — {projectInfo.endDate && formatMonthYear(convertFirestoreTimestampToJSDate(projectInfo.endDate))}
            </div>
            {projectInfo.image &&
                <motion.div
                    initial={{y: 100, opacity: 0}}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {duration: 1.0, ease: 'easeInOut'}
                    }}
                    exit={{
                        y: 100,
                        opacity: 0,
                        transition: {duration: 0.25, ease: 'easeInOut'}
                    }}
                >
                    <img src={projectInfo.image.src} alt={projectInfo.image.alt} className="pt-4 2xl:py-12"/>
                </motion.div>
            }
        </div>
    )
}

const ProjectPageOverview = ({projectInfo}) => {
    return (
        <div
            className="flex flex-col justify-center items-center gap-x-16 py-16 md:py-40 w-page-default md:w-page-md lg:w-page-lg 2xl:w-page-2xl ">
            <div className="flex flex-col md:flex-row h-fit justify-center items-center gap-y-10 md:gap-y-0">
                <div className="flex flex-col justify-start items-start md:w-1/2 gap-y-10">
                    {(projectInfo.overview.role.name || projectInfo.overview.role.description) &&
                        <div className="flex flex-col">
                            <h2 className="text-custom-light font-bold mb-1 text-sm 2xl:text-lg">My Role</h2>
                            <p className="text-custom-light text-opacity-50 text-base 2xl:text-lg">
                                <span
                                    className="text-custom-light text-base 2xl:text-lg">{projectInfo.overview.role.title}&nbsp;</span>
                                — {projectInfo.overview.role.description}
                            </p>
                        </div>
                    }
                    {(projectInfo.overview.team) &&
                        <div className="flex flex-col">
                        <h2 className="text-custom-light font-bold mb-1 text-sm 2xl:text-lg">Team</h2>
                            {projectInfo.overview.team.map((member, index) => (
                                <p key={index}
                                   className="text-custom-light text-opacity-50 text-base 2xl:text-lg">{member.name}, {member.role}</p>
                            ))}
                        </div>
                    }
                    {(projectInfo.overview.status && (projectInfo.endDate || projectInfo.startDate)) &&
                        <div className="flex flex-col">
                            <h2 className="text-custom-light font-bold mb-1 text-sm 2xl:text-lg">Timeline & Status</h2>
                            <p className="text-custom-light text-opacity-50 text-base 2xl:text-lg">
                                {calculateTimeElapsed((projectInfo.startDate), (projectInfo.endDate))},&nbsp;
                                <span
                                    className="text-custom-light text-base 2xl:text-lg">{projectInfo.overview.status}</span>
                            </p>
                        </div>
                    }
                </div>
                <div className="flex flex-col justify-start items-start h-full md:w-1/2 gap-y-10">
                    {(projectInfo.overview.overview) &&
                        <div className="flex flex-col">
                            <div className="text-custom-light font-bold mb-1 text-sm 2xl:text-lg">Overview</div>
                            <div className="text-custom-light text-opacity-50 text-base 2xl:text-lg">
                                {projectInfo.overview.overview}
                            </div>
                        </div>
                    }
                    <div className="flex flex-wrap md:flex-row w-full justify-evenly md:justify-start gap-x-8 items-center">
                        {projectInfo.overview.technologies.map((technology, index) => (
                            <Tooltip key={index} text={technology.name}>
                                {getIconByName({iconName: technology.icon, className: 'w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12'})}
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProjectPageHighlights = ({projectInfo}) => {
    return (
        <HighlightCard accentColor={projectInfo.color} className="p-3 md:p-6 gap-y-8 md:gap-y-12 w-page-default md:w-page-md lg:w-page-lg 2xl:w-page-2xl">
            <div className="flex flex-col justify-between items-center gap-y-4">
                <div className="rounded-full bg-custom-dark bg-opacity-50 p-1.5 2xl:p-2.5 shadow-md shadow-custom-dark">
                    <FaMountainSun color={projectInfo.color} className="w-8 h-8 md:w-10 md:h-10 2xl:w-12 2xl:h-12"/>
                </div>
                <div className="text-xs md:text-sm text-custom-light font-semibold text-opacity-50">
                    HIGHLIGHTS
                </div>
                <div className="text-base md:text-lg text-custom-light font-semibold text-center">
                    {projectInfo.highlightsDescription}
                </div>
            </div>
            {projectInfo.highlights.map((highlight, index) => {
                return (
                    <div key={index} className="w-full flex flex-col">
                        {highlight.asset.type === 'VIDEO' ? (
                            <video src={highlight.asset.src} controls>
                                <source src={highlight.asset.src} type="video/mp4"/>
                            </video>
                        ) : highlight.asset.type === 'IMAGE' ? (
                            <img src={highlight.asset.src} alt={highlight.asset.alt}/>
                        ) : (
                            <p>Invalid asset type: {highlight.asset.type}</p>
                        )}
                        <div className="flex flex-row justify-end items-center gap-x-2 text-xs md:text-sm text-custom-light text-opacity-50 font-semibold mt-2 text-end">
                            {highlight.asset.alt}
                            <span className="bg-custom-dark bg-opacity-50 rounded-full p-1.5 shadow-inner shadow-custom-dark">
                            {highlight.asset.type}
                        </span>
                        </div>
                    </div>
                )
            })}
        </HighlightCard>
    )
}

export default ProjectPage;
