import React from 'react';
import './Content.css';
import Images from '../../Assets/img1.png';
import Images1 from '../../Assets/img2.png';
import Images2 from '../../Assets/img3.png';

export default function Content() {
    return (
        <div className="py-4">
            <h1 className="mt-4 my-2 font-extrabold text-2xl">The Third Sneak-Peek of Startup</h1>
            <h1 className="font-extrabold p-2 text-2xl">Framework</h1>
            <div className="ptext ">
                <p className="py-2">We have created a new product that will help designers, developers and companies</p>
                <p>create websites for their startups quickly and easily.</p>
            </div>
            <div className="con_box my-4">
                <div class="cad shadow">
                    <img src={Images} className="shadow"/>
                    <h3 className="boxhead py-2">Chuck Taylor All Star</h3>
                    <div className="boxtext">
                        <p>Lorem Ipsum is simply dummy text of the</p>
                        <p> printing and typesetting industry.</p>
                    </div>
                    <div className="py-4 px-2">
                        <button type="submit">See more</button>
                    </div>
                </div>

                <div className="cad shadow">
                    <img src={Images1} className="shadow" />
                    <h3 className="boxhead py-2">Chuck Taylor All Star</h3>
                    <div className="boxtext">
                        <p>Lorem Ipsum is simply dummy text of the</p>
                        <p> printing and typesetting industry.</p>
                    </div>
                    <div className="py-4 px-2">
                        <button type="submit">See more</button>
                    </div>
                </div>

                <div className="cad shadow">
                    <img src={Images2} className="shadow" />
                    <h3 className="boxhead py-2">Chuck Taylor All Star</h3>
                    <div className="boxtext">
                        <p>Lorem Ipsum is simply dummy text of the</p>
                        <p> printing and typesetting industry.</p>
                    </div>
                    <div className="py-4 px-4">
                        <button type="submit">See more</button>
                    </div>
                </div>

            </div>
            
        </div>


    )
}

