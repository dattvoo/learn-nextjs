import { PacmanLoader } from 'react-spinners';


interface ISpinner {
    isLoading: boolean
}

const Spinner = ({ isLoading }: ISpinner) => {
    return (
        isLoading
            ?
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-20">
                <PacmanLoader color="#ffffff" />
            </div>
            :
            <></>
    );
};

export default Spinner;
