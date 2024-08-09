export default function Hero({ onSaveSegmentClick }) {
  return (
    <div className="container m-5">
      <button
        className="p-2 border-white border-2 text-white lg:ml-10 font-medium"
        onClick={onSaveSegmentClick}
      >
        Save Segment
      </button>
    </div>
  );
}
