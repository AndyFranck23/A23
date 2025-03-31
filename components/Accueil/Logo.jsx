// components/Logo.jsx
export default function Logo() {
    return (
        <div className="flex items-center">
            <svg
                className="h-12 w-12 mr-3"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Cercle pour le chocolat */}
                <circle cx="25" cy="25" r="20" className="fill-yellow-500 dark:fill-yellow-300" />
                {/* Cercle pour la technologie */}
                <circle cx="75" cy="25" r="20" className="fill-blue-500 dark:fill-blue-300" />
                {/* Cercle pour la mode */}
                <circle cx="50" cy="75" r="20" className="fill-pink-500 dark:fill-pink-300" />
            </svg>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Les 3 Merveilles
            </span>
        </div>
    );
}
