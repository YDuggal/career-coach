import React from 'react';
import PropTypes from 'prop-types';
import './card-style.css'
import NumberFormat from 'react-number-format';
import { Line } from 'rc-progress'
import Cash from 'react-ionicons/lib/MdCash'
import School from 'react-ionicons/lib/MdSchool'


function educationView(educationAttainmentLevels) {
    const educationAttainmentLevelsArray = [];
    Object.entries(educationAttainmentLevels).forEach((element) => {
        if (element[0] === '0') {
            educationAttainmentLevelsArray.push(
                <b>{element[1].level}</b>, '\n')
        }
        else {
            educationAttainmentLevelsArray.push(
                element[1].level, '\n')
        }
    })
    return (educationAttainmentLevelsArray);

}

function createPercentBar(educationAttainmentLevels) {
    const barArray = [];
    Object.values(educationAttainmentLevels).forEach((element) => {
        barArray.push(
            <Line className="line-bar"
                percent={element.percent}
                strokeWidth="1.5"
                strokeColor="#AA182C"
                strokeLinecap="square"
            />,
            ' ',
            Math.round(element.percent), '%'
        )
    })

    console.log(barArray);
    return barArray;
}


const Card = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="container">
                    <div className="top-container">
                        <h2 className="card-title">
                            {props.title}
                        </h2>

                        <span className="card-text">
                            {props.description}
                        </span>
                    </div>

                    <div className="overflow">
                        <img className="image" alt="thumbnail" src={props.thumbnailUrl}>
                        </img>
                    </div>
                </div>

                <div className="container">
                    <div className="salary-sub-container">
                        <div className="sub-container">
                            <div className="icon-bg">
                                <Cash color="grey" className="icon" />
                            </div>
                            <div className="median-space">
                                <div className="sub-title">
                                    Median Salary
                                </div>
                                <br />
                                <NumberFormat value={Math.round((props.medianSalary))}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    className="salary" />
                            </div>
                        </div>
                    </div>

                    <div className="education-sub-container">
                        <div className="sub-container">
                            <div className="icon-bg">
                                <School color="grey" className="icon" />
                            </div>
                            <div className="education-space">
                                <span>
                                    Top Entry-level Education
                                </span>
                                <br />
                                <div className="education-container">
                                    <pre className="level">
                                        {educationView(props.educationAttainmentLevels)}
                                    </pre>
                                    <div className="bar">
                                        {createPercentBar(props.educationAttainmentLevels)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    medianSalary: PropTypes.number.isRequired,
    educationAttainmentLevels: PropTypes.object.isRequired,
    thumbnailUrl: PropTypes.string.isRequired
}

export default Card;