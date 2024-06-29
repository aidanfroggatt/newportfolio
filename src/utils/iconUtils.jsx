import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as DiIcons from "react-icons/di";
import * as FiIcons from "react-icons/fi";
import * as FcIcons from "react-icons/fc";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as TbIcons from "react-icons/tb";
import * as TiIcons from "react-icons/ti";
import * as VscIcons from "react-icons/vsc";
import * as WiIcons from "react-icons/wi";

// Combine all imports into a single object
const AllIcons = {
    ...SiIcons,
    ...FiIcons,
    ...FaIcons,
    ...AiIcons,
    ...BiIcons,
    ...BsIcons,
    ...DiIcons,
    ...FiIcons,
    ...FcIcons,
    ...GiIcons,
    ...GoIcons,
    ...GrIcons,
    ...HiIcons,
    ...ImIcons,
    ...IoIcons,
    ...Io5Icons,
    ...MdIcons,
    ...RiIcons,
    ...TbIcons,
    ...TiIcons,
    ...VscIcons,
    ...WiIcons
};

// Description: This file contains icon utility functions.

/**
 * @author Aidan Froggatt
 * @description This function returns an icon component based on the icon name provided.
 * @param iconName - Must be a valid icon name from the react-icons/si package.
 * @param style - Optional style object.
 * @param className - Optional class name.
 * @returns {JSX.Element|null}
 */
export const getReactIconByName = ({iconName, style, className}) => {
    const IconComponent = AllIcons[iconName];
    return IconComponent ? <IconComponent style={style} className={className}/> : null;
};