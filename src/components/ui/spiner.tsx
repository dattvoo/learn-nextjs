import { PacmanLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-20">
            <PacmanLoader color="#ffffff" />
        </div>
    );
};

export default Spinner;
