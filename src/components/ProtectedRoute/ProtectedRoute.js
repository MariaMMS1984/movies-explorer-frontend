import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUsercontext';

function ProtectedRoute({ children, isLoading }) {
    const currentUser = React.useContext(CurrentUserContext);

    if (isLoading) return <Preloader />;
    if (!currentUser) return <Navigate to="/" />;
    return children;
}

export default ProtectedRoute;