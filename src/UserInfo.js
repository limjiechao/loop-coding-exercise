import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

const styles = {
  card: { borderLeft: 'solid 4px #ff9800', flex: 1, margin: '1rem', width: '40%' },
  icon: { float: 'left', width: '64px', height: '64px', padding: '12px', color: '#ff9800' },
};

export default ({ value, subtitle }) => (
    <Card style={styles.card}>
        <AccountCircle style={styles.icon} />
        <CardTitle title={value} subtitle={subtitle} />
    </Card>
);
