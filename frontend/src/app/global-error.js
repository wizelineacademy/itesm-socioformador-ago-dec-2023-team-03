'use client';

/**
 * GlobalError component.
 * @component
 * @param {Object} props - The props.
 * @param {Error} props.error - The error object.
 * @param {Function} props.reset - The function to reset the error.
 * @returns {JSX.Element} The rendered GlobalError component.
 */
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
