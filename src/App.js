import React, { Component } from 'react';
import InputFullSalary from './components/InputFullSalary';

import InputReadOnly from './components/InputReadOnly';

import { calculateSalaryFrom } from './helpers/salary';
import ProportionBar from './components/ProportionBar';

import css from './components/header.module.css';

const COLOR_INSS = '#e67e22';
const COLOR_IRPF = '#c0392b';
const COLOR_NET_SALARY = '#16a085';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };
  }

  handleFullSalaryChange = (newValue) => {
    this.setState({ fullSalary: newValue });
  };

  render() {
    const { fullSalary } = this.state;

    const salaryObject = calculateSalaryFrom(fullSalary);

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      percentINSS,
      percentIRPF,
      percentNetSalary,
    } = salaryObject;

    return (
      <>
        <div className={css.sidebar}>
          <h3>Calcular Salário</h3>
        </div>
        <div className="container">
          <div className="row">
            <InputFullSalary
              currentValue={fullSalary}
              onSalaryChange={this.handleFullSalaryChange}
            />
          </div>
          <div className="row">
            <InputReadOnly label="Base INSS" value={baseINSS} />
            <InputReadOnly
              label="Desconto INSS"
              value={discountINSS}
              percentage={percentINSS}
              color={COLOR_INSS}
            />
            <InputReadOnly label="Base IRPF" value={baseIRPF} />
            <InputReadOnly
              label="Desconto IRPF"
              value={discountIRPF}
              percentage={percentIRPF}
              color={COLOR_IRPF}
            />
            <InputReadOnly
              label="Salário líquido"
              value={netSalary}
              percentage={percentNetSalary}
              color={COLOR_NET_SALARY}
            />
          </div>
          <ProportionBar
            inss={percentINSS}
            irpf={percentIRPF}
            netSalary={percentNetSalary}
            colorINSS={COLOR_INSS}
            colorIRPF={COLOR_IRPF}
            colorNetSalary={COLOR_NET_SALARY}
          />
        </div>
        <div className={css.footer}>Criado por Ronaldo Reis</div>
      </>
    );
  }
}
