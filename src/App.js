import logo from './logo.svg';
import './App.scss';
import Item from './Componentes/Item/Item';
import Formulario from './Componentes/Formulario/Formulario';
import Menu from './Componentes/Menu/Menu';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BotonMovible from './Componentes/BotonMovible/BotonMovible';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  initAddTask,
} from './reducers/tasksSlice';
import{
  initAddGoal
} from './reducers/goalsSlice';

function App() {
  const option = useSelector(state => state.option.value);
  const goals = useSelector((state)=>state.goals.value);
  const tasks = useSelector((state)=>state.tasks.value);
  const dispatch = useDispatch();

  function initFetch(){
    fetch("http://localhost:3001/tasks/getTasks",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"cursodedesarollodeapliacionesweb"
      }
    }).then((response)=>{
      return response.json();
    }).then((response)=>{
      response.map((task)=>{
        dispatch((initAddTask(task)));
      })
      
    }).catch((err)=>{
      console.log(err);
    })

    fetch("http://localhost:3001/Goals/getGoals",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"cursodedesarollodeapliacionesweb"
      }
    }).then((response)=>{
      return response.json();
    }).then((response)=>{
      response.map((task)=>{
        dispatch((initAddGoal(task)));
      })
      
    }).catch((err)=>{
      console.log(err);
    })


  }

  useEffect(()=>{
    initFetch();
  },{});


  return (
    <div className="App">
      <Menu/>
      <Container>
      <Row>
        <Col xs={0} md={0}  className='d-none d-sm-block d-sm-none d-md-block '><Formulario/></Col>
        <Col xs ={0}  sm ={0}>
          <Row className='d-md-none'>
            <div className='bg-transparent overlapping-div ' >
              <BotonMovible className='float-left'/>
            </div>
          </Row>
          <Row>
            <div className='scrolling'>
            {option === 'goals' ? (
                  goals.map((goal, index) => (
                    <Item key={index} name={goal.name} description={goal.description} dueDate={goal.dueDate} id={goal.id} />
                  ))
                ) : (
                  tasks.map((task, index) => (
                    <Item key={index} name={task.name} description={task.description} dueDate={task.dueDate} id={task.id} />
                  ))
                )}
          </div>
          </Row>
        </Col>
      </Row>
    </Container>

    </div>

  );
}

export default App;

