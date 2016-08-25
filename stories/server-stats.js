import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ServerStatsComponent from '../src/components/server-stats';

storiesOf('ServerStatsComponent', module)
  .addWithInfo(
    'default',
    'Top-level component that is connected to the store.', () => (
    <ServerStatsComponent />
  ));
