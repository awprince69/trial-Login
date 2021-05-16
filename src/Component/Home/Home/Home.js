import React from 'react';
import Header from '../Header/Header';
import './Home.css'

const Home = () => {
    return (
        <div className='homeContainer'>
            <Header></Header>
            <div className="mx-auto my-5 p-4 px-4 formStyle text-white text-center">
                <h1 className='mt-5 pt-5'>Welcome </h1>
            </div>
        </div>
    );
};

export default Home;