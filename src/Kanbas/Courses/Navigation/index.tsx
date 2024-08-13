import { Link, useLocation } from "react-router-dom";
import "./index.css";

export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const courseId = pathname.split("/")[3];

  const links = [
    { label: "Home", path: `/Kanbas/Courses/${courseId}/Home` },
    { label: "Modules", path: `/Kanbas/Courses/${courseId}/Modules` },
    { label: "Piazza", path: `/Kanbas/Courses/${courseId}/Piazza` },
    { label: "Zoom", path: `/Kanbas/Courses/${courseId}/Zoom` },
    { label: "Assignments", path: `/Kanbas/Courses/${courseId}/Assignments` },
    { label: "Quizzes", path: `/Kanbas/Courses/${courseId}/Quizzes` },
    { label: "Grades", path: `/Kanbas/Courses/${courseId}/Grades` },
    { label: "People", path: `/Kanbas/Courses/${courseId}/People` },
  ];

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.path}
          className={`list-group-item border-0 ${pathname.includes(link.label) ? "active" : "text-danger"}`}
          id={`wd-course-${link.label.toLowerCase()}-link`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
