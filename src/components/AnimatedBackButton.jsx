import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Button from "./Button.jsx";

const ProjectPageBackButton = () => {
    const navigate = useNavigate();
    const [isBackClicked, setIsBackClicked] = useState(false);

    useEffect(() => {
        if (isBackClicked) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 250); // Duration of the exit animation
            return () => clearTimeout(timer);
        }
    }, [isBackClicked, navigate]);

    const handleBack = () => {
        setIsBackClicked(true);
    };

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed flex flex-row justify-center items-center top-0 left-0 h-20 p-12"
        >
            <Button title="Back" leftArrow={true} handleClick={handleBack} />
        </motion.div>
    );
};

export default ProjectPageBackButton;