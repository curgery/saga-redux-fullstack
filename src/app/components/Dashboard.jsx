import { connect } from 'react-redux'
import React from 'react'
import { ConnectedTaskList } from './TaskList'

const Dashboard = ({groups}) => (
    <div>
      <h2>Dashboard</h2>
        {groups.map(group=>(
            <ConnectedTaskList key={group.id} id={group.id} name={group.name} />
        ))}
    </div>
)

function mapStateToProps(state){
    return {
        groups:state.groups
    }
}

 export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

 

