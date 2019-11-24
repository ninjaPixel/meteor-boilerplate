import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { actions } from '@storybook/addon-actions';

import ModalCard from '../view/components/ModalCard/ModalCard';

export default {
  title: 'Modal',
  decorators: [withKnobs],
};

const eventsFromNames = actions('onClose', 'onRequestOk');

export const Modal = () => (
  <ModalCard
    {...eventsFromNames}
    show={boolean('show', true)}
    processingSubmit={boolean('processingSubmit', false)}
    okText={text('okText', 'Confirm')}
    cancelText={text('cancelText', 'Close')}
    title={text('title', 'The title')}
    hideCancelButton={boolean('hideCancelButton', false)}
    hideOkButton={boolean('hideOkButton', false)}
  >
    <>
      <Typography>
        Lorem ipsum dolor amet man braid chartreuse pok pok, taiyaki live-edge swag chia cray occupy bushwick yr
        slow-carb twee street art. Beard knausgaard edison bulb af freegan brunch. Ugh humblebrag typewriter vice.
        Mlkshk flannel photo booth post-ironic four loko skateboard copper mug cronut whatever iceland gentrify selvage.
        Fanny pack tattooed neutra tote bag. Tilde cloud bread cornhole, drinking vinegar meh authentic lyft tumeric
        hella pabst church-key put a bird on it raw denim literally. Squid kinfolk sustainable, next level affogato
        hammock kale chips hashtag echo park typewriter vexillologist heirloom.
      </Typography>
      <Typography>
        Butcher cronut umami, you probably haven't heard of them actually cloud bread brunch kombucha farm-to-table
        locavore shoreditch. Irony man bun raclette 90's copper mug, pour-over blue bottle art party. Pitchfork selvage
        deep v cloud bread. Tumblr butcher literally, intelligentsia narwhal organic PBR&B whatever authentic banjo deep
        v ugh neutra fixie. Roof party XOXO pinterest trust fund pabst microdosing heirloom pitchfork, godard kombucha
        lyft cardigan lo-fi everyday carry.
      </Typography>
      <Typography>
        Hashtag quinoa af tumeric. Cronut helvetica prism 3 wolf moon crucifix leggings fanny pack poke dreamcatcher
        hexagon stumptown locavore. Locavore normcore austin glossier. Pabst green juice shaman seitan art party
        gochujang VHS shoreditch crucifix irony sustainable jianbing direct trade. Wolf ethical flexitarian PBR&B
        freegan pitchfork paleo.
      </Typography>
    </>
  </ModalCard>
);

const someText =
  '      Lorem ipsum dolor amet man braid chartreuse pok pok, taiyaki live-edge swag chia cray occupy bushwick yr slow-carb\n' +
  '      twee street art. Beard knausgaard edison bulb af freegan brunch. Ugh humblebrag typewriter vice. Mlkshk flannel\n' +
  '      photo booth post-ironic four loko skateboard copper mug cronut whatever iceland gentrify selvage. Fanny pack\n' +
  '      tattooed neutra tote bag. Tilde cloud bread cornhole, drinking vinegar meh authentic lyft tumeric hella pabst\n' +
  '      church-key put a bird on it raw denim literally. Squid kinfolk sustainable, next level affogato hammock kale chips\n' +
  '      hashtag echo park typewriter vexillologist heirloom.';
export const ModalWithTitleAndText = () => (
  <ModalCard {...eventsFromNames} show title="Hello, World!" hideOkButton hideCancelButton>
    <Typography>{someText}</Typography>
  </ModalCard>
);

export const ModalWithTextAndActions = () => (
  <ModalCard {...eventsFromNames} show>
    <Typography>{someText}</Typography>
  </ModalCard>
);

export const ModalWithTitleAndActions = () => (
  <ModalCard
    {...eventsFromNames}
    show
    title="This is a fairly long title. It might be enough to cause issues if we are not careful"
  ></ModalCard>
);
