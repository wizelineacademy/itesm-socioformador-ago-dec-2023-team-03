import { twMerge } from "tailwind-merge";

/**
 * Interface for BoxProps.
 * @interface
 * @property {React.ReactNode} children - The children nodes.
 * @property {string} [className] - The taildiwnds CSS class.
 */
interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Box component (used for encapsuled other parts of the UI).
 * @component
 * @param {BoxProps} props - The props.
 * @param {React.ReactNode} props.children - The children nodes.
 * @param {string} [props.className] - The CSS class.
 * @returns {JSX.Element} The rendered Box component.
 */
const Box: React.FC<BoxProps> = ({
    children,
    className,
}) => {
    return (
        <div className={twMerge(`
        bg-regal-blue
        h-fit
        w-full
    `,
            className
        )}
        >
            {children}
        </div>
    );
}

export default Box;
