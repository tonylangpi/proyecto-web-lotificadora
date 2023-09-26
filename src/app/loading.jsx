
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="text-center">
      <div className="spinner-grow text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
