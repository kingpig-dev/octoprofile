import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GhPolyglot from 'gh-polyglot';
import Chart from 'chart.js';
import { languages } from '../data';
import styled from 'styled-components';
import { theme } from '../style';
const { colors, fonts } = theme;

const StyledSection = styled.section`
  .chart {
    max-width: 500px;
  }
`;

class Languages extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  };

  state = {
    languages,
    chartType: 'bar',
  };

  componentDidMount() {
    // const me = new GhPolyglot(`${username}`);
    // me.userStats((err, stats) => {
    //   if (err) {
    //     throw new Error(err);
    //   }
    //   this.setState({ languages: stats }, () => this.buildChart());
    // });

    this.buildChart();
  }

  buildChart = () => {
    const { languages, chartType } = this.state;
    const ctx = document.getElementById('langChart');

    const labels = languages.map(lang => lang.label);
    const data = languages.map(lang => lang.value);
    const backgroundColor = languages.map(
      ({ color }) => `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}77`,
    );
    const borderColor = languages.map(lang => `${lang.color}`);

    window.mychart = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Languages',
            data,
            backgroundColor,
            borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };

  changeChartType = e => {
    window.mychart.destroy();
    this.setState({ chartType: e.target.value }, () => this.buildChart());
  };

  render() {
    return (
      <StyledSection>
        <h2>Top Languages</h2>
        {/* eslint-disable-next-line */}
        <select name="chartType" onChange={this.changeChartType}>
          <option value="bar">Bar</option>
          <option value="polarArea">Polar Area</option>
          <option value="doughnut">Doughnut</option>
          <option value="pie">Pie</option>
        </select>

        <canvas id="langChart" className="chart" width="400" height="400" />
      </StyledSection>
    );
  }
}

export default Languages;
