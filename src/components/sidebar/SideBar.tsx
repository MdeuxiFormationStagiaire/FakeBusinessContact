import { AnimatePresence, motion } from "framer-motion"
import { FaBars, FaUsersCog } from "react-icons/fa";
import { BsCalendar2Week } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { ImProfile } from "react-icons/im";
import { TbScreenShare } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { IoSchoolOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { IconContext } from "react-icons";
import "../../assets/styles/components/sidebar/Sidebar.css";

const routes = [
  {
    path: "/home",
    name: "Planning",
    icon: <BsCalendar2Week title="Planning"/>
  },
  {
    path: "/reservations",
    name: "Réservations",
    icon: <IoSchoolOutline title="Réservations"/>
  },
  {
    path: "/formateurs",
    name: "Formateurs",
    icon: <GiTeacher title="Formateurs"/>
  },
  {
    path: "/salles",
    name: "Salles",
    icon: <SiGoogleclassroom title="Salles"/>
  },
  {
    path: "/stagiaires",
    name: "Stagiaires",
    icon: <ImProfile title="Stagiaires"/>
  },
  {
    path: "/affichage",
    name: "Affichage",
    icon: <TbScreenShare title="Affichage"/>
  },
  {
    path: "/utilisateurs",
    name: "Utilisateurs",
    icon: <FaUsersCog title="Utilisateurs"/>
  },
]

const SideBar = ({children} : any) => {

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen);

  const location = useLocation();

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
          <>
            {routes.map((route) => {
              let className = 'link';
              switch (route.name) {
                case 'Planning':
                  className += '-home';
                break;
                case 'Réservations':
                  className += '-home';
                break;
                case 'Formateurs':
                  className += '-formateurs';
                break;
                case 'Salles':
                  className += '-salles';
                break;
                case 'Stagiaires':
                  className += '-stagiaires';
                break;
                case 'Affichage':
                  className += '-home';
                break;
                case 'Utilisateurs':
                  className += '-utilisateurs';
                break;
                default:
                break;
              }
              const isActive = location.pathname.startsWith(route.path);
              return (
                <NavLink to={route.path} className={`${className}${isActive ? '-active' : ''}`}>
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </>
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