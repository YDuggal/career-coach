import React, { Component } from 'react'
import Card from './CardUI';
// import data from '../data/careerData';

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: {},
            cardElements: [],
            sortData: []
        }

        this.generateCardData = this.generateCardData.bind(this)
    }

    async componentDidMount() {

        const url = "https://my-json-server.typicode.com/YDuggal/career-coach/db";
        const response = await fetch(url);
        // data = await response.json();
        // console.log(data);
        this.setState({ data: await response.json() })
    }

    generateCardData() {
        const { data, sortData } = this.state;
        Object.values(data).forEach((child) => {
            Object.values(child).forEach((grandchild) => {
                const tester = [];

                tester.push(...grandchild.educationAttainmentLevels)

                sortData.push(
                    {
                        title: grandchild.title,
                        description: grandchild.description,
                        salary: grandchild.medianSalary,
                        education: tester,
                        url: grandchild.thumbnailUrl
                    })

                Object.values(grandchild).forEach((element) => {
                }
                )
            })
        })
    }

    createSortedCards() {
        const { sortData, cardElements } = this.state;
        sortData.sort((a, b) => a.salary < b.salary);
        if (sortData) {
            Object.entries(sortData).forEach((element) => {
                element[1].education.sort((a, b) => a.percent < b.percent);
                cardElements.push(
                    <Card title={element[1].title}
                        description={element[1].description}
                        medianSalary={element[1].salary}
                        educationAttainmentLevels={element[1].education.slice(0, 3)}
                        thumbnailUrl={element[1].url}
                    />
                );
            })
        }
    }

    render() {
        // destructive assignment
        const { cardElements } = this.state;
        this.generateCardData();
        this.createSortedCards();
        return (
            <div>
                {cardElements}
            </div>
        )
    }
}
export default Cards