const handleError = (error, setError, errorMessage = null) => {
    if (errorMessage) {
        console.error(`${errorMessage}:`, error);
    } else {
        console.error(error);
    }
    setError(error.message);
};

export default handleError;
