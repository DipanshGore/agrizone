import NotfoundImg from '../assets/Notfound.jpg';

const NotFound = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <img
          src={NotfoundImg}
          alt="Not Found"
          className="w-150 h-150 mb-20"
        />
        <a
          href="/"
          className="px-6 py-2 rounded-full font-semibold "
          style={{
            backgroundColor: "#AAFF00",
            color: "#green",
          }}
        >
          Go Home
        </a>
      </div>
    </>
  )
}

export default NotFound;