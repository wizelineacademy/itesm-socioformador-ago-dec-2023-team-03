'use client';

/**
 * Error component used when an error throw.
 * @component
 * @param {Object} props - The props.
 * @param {Error} props.error - The error object itself.
 * @param {Function} props.reset - The function to reset the error and try again.
 * @returns {JSX.Element} The rendered Error component.
 */
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
