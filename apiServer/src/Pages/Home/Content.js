import React from 'react';
import './Content.css';
import Images from '../../Assets/img1.png';
import Images1 from '../../Assets/img2.png';
import Images2 from '../../Assets/img3.png';

export default function Content() {
    return (
        <div>
            <h1 className="m-4">The Third Sneak-Peek of Startup</h1>
            <h1>Framework</h1>
            <div className="ptext ">
                <p className="m-4">We have created a new product that will help designers, developers and companies</p>
                <p>create websites for their startups quickly and easily.</p>
            </div>
            <div className="con_box ">
                <div class="cad shadow">
                    <img src={Images} className="shadow"/>
                    <h3 className="boxhead">Chuck Taylor All Star</h3>
                    <div className="boxtext">
                        <p>Lorem Ipsum is simply dummy text of the</p>
                        <p> printing and typesetting industry.</p>
                    </div>
                    <div>
                        <button type="submit">See more</button>
                    </div>
                </div>

                <div className="cad shadow">
                    <img src={Images1} className="shadow" />
                    <h3 className="boxhead">Chuck Taylor All Star</h3>
                    <div className="boxtext">
                        <p>Lorem Ipsum is simply dummy text of the</p>
                        <p> printing and typesetting industry.</p>
                    </div>
                    <div>
                        <button type="submit">See more</button>
                    </div>
                </div>

                <div className="cad shadow">
                    <img src={Images2} className="shadow" />
                    <h3 className="boxhead">Chuck Taylor All Star</h3>
                    <div className="boxtext">
                        <p>Lorem Ipsum is simply dummy text of the</p>
                        <p> printing and typesetting industry.</p>
                    </div>
                    <div>
                        <button type="submit">See more</button>
                    </div>
                </div>

            </div>
            
        </div>


    )
}

