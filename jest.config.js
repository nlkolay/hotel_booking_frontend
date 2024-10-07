module.exports = {
    transform: {
    "^.+\.(ts|tsx)$": "babel-jest",
    "^.+\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
    "\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
    };