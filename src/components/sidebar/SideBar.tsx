import { AnimatePresence, motion } from "framer-motion"
import { FaBars, FaHome, FaUsersCog } from "react-icons/fa";
import { BsCalendar2Week } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { ImProfile } from "react-icons/im";
import { TbScreenShare } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { IconContext } from "react-icons";
import "../../assets/styles/components/sidebar/Sidebar.css";

const routes = [
    {
        path: "/",
        name: "Home",
        icon: <FaHome/>
    },
    {
        path: "/reservations",
        name: "Réservations",
        icon: <BsCalendar2Week/>
    },
    {
        path: "/formateurs",
        name: "Formateurs",
        icon: <GiTeacher/>
    },
    {
        path: "/salles",
        name: "Salles",
        icon: <SiGoogleclassroom/>
    },
    {
        path: "/stagiaires",
        name: "Stagiaires",
        icon: <ImProfile/>
    },
    {
        path: "/affichage",
        name: "Affichage",
        icon: <TbScreenShare/>
    },
    {
        path: "/utilisateurs",
        name: "Utilisateurs",
        icon: <FaUsersCog/>
    },
]

const SideBar = ({children} : any) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen);

    const showAnimation = {
        hidden: {
            width: 0,
            opacity : 0,
            transition: {
                duration: 0.5,
            }
        },
        show: {
            width: "auto",
            opacity: 1,
            transition: {
                duration: 0.2,
            }
        }
    }

    return (
        <IconContext.Provider
            value={{ size: '25px'}}
        >
        <div className="main-container">
            <motion.div animate={{width: isOpen ? "200px" : "45px"}} className='sidebar'>
                <div className="top_section">
                    <div className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                    {isOpen && 
                    <motion.h1 variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="logo">Dashboard
                    </motion.h1>}
                </div>
                <section className="routes">
                    {routes.map((route) => (
                        <NavLink to={route.path} key={route.name} className='link'>
                            <div className="icon">{route.icon}</div>
                            <AnimatePresence>
                                {isOpen && <motion.div variants={showAnimation}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="link_text">{route.name}</motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    ))}
                </section>
                <div className="utilisateur">
                    <div className="logout"><FiLogOut/></div>
                    <div className="currentUser">
                        <h3>Nara Tanier</h3>
                        <p>Administateur</p>
                    </div>
                </div>
            </motion.div>
            <main>{children}</main>
        </div>
        </IconContext.Provider>
    )
}

export default SideBar;