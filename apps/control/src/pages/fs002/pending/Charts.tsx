import styles from './Charts.module.scss';
import DraggableChart from './DraggableChart';

const Charts = () => {
  return (
    <div className={styles.charts}>
      <DraggableChart chartName={'width'} />
      <DraggableChart chartName={'thickness'} />
    </div>
  );
};

export default Charts;
