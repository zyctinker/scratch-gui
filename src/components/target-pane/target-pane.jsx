import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import VM from 'scratch-vm';

import Box from '../box/box.jsx';
import BackdropLibrary from '../../containers/backdrop-library.jsx';
import CostumeLibrary from '../../containers/costume-library.jsx';
import SoundLibrary from '../../containers/sound-library.jsx';
import SpriteLibrary from '../../containers/sprite-library.jsx';
import SpriteSelectorComponent from '../sprite-selector/sprite-selector.jsx';
import StageSelector from '../../containers/stage-selector.jsx';
import IconButton from '../icon-button/icon-button.jsx';

import styles from './target-pane.css';
import spriteIcon from './icon--sprite.svg';
import backdropIcon from './icon--backdrop.svg';

const addSpriteMessage = (
    <FormattedMessage
        defaultMessage="Add Sprite"
        description="Button to add a sprite in the target pane"
        id="targetPane.addSprite"
    />
);

const addBackdropMessage = (
    <FormattedMessage
        defaultMessage="Add Backdrop"
        description="Button to add a backdrop in the target pane"
        id="targetPane.addBackdrop"
    />
);

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
const TargetPane = ({
    editingTarget,
    backdropLibraryVisible,
    costumeLibraryVisible,
    soundLibraryVisible,
    spriteLibraryVisible,
    onChangeSpriteDirection,
    onChangeSpriteName,
    onChangeSpriteRotationStyle,
    onChangeSpriteVisibility,
    onChangeSpriteX,
    onChangeSpriteY,
    onDeleteSprite,
    onNewSpriteClick,
    onNewBackdropClick,
    onRequestCloseBackdropLibrary,
    onRequestCloseCostumeLibrary,
    onRequestCloseSoundLibrary,
    onRequestCloseSpriteLibrary,
    onSelectSprite,
    stage,
    sprites,
    vm,
    ...componentProps
}) => (
    <Box
        className={styles.targetPane}
        {...componentProps}
    >

        <SpriteSelectorComponent
            selectedId={editingTarget}
            sprites={sprites}
            onChangeSpriteDirection={onChangeSpriteDirection}
            onChangeSpriteName={onChangeSpriteName}
            onChangeSpriteRotationStyle={onChangeSpriteRotationStyle}
            onChangeSpriteVisibility={onChangeSpriteVisibility}
            onChangeSpriteX={onChangeSpriteX}
            onChangeSpriteY={onChangeSpriteY}
            onDeleteSprite={onDeleteSprite}
            onSelectSprite={onSelectSprite}
        />
        <Box className={styles.stageSelectorWrapper}>
            {stage.id && <StageSelector
                assetId={
                    stage.costume &&
                    stage.costume.assetId
                }
                backdropCount={stage.costumeCount}
                id={stage.id}
                selected={stage.id === editingTarget}
                onSelect={onSelectSprite}
            />}
            <Box>
                <Box className={classNames(styles.addButtonWrapper, styles.addButtonWrapperSprite)}>
                    <IconButton
                        className={styles.addButton}
                        img={spriteIcon}
                        title={addSpriteMessage}
                        onClick={onNewSpriteClick}
                    />
                </Box>
                <Box className={classNames(styles.addButtonWrapper, styles.addButtonWrapperStage)}>
                    <IconButton
                        className={styles.addButton}
                        img={backdropIcon}
                        title={addBackdropMessage}
                        onClick={onNewBackdropClick}
                    />
                </Box>
                <SpriteLibrary
                    visible={spriteLibraryVisible}
                    vm={vm}
                    onRequestClose={onRequestCloseSpriteLibrary}
                />
                <CostumeLibrary
                    visible={costumeLibraryVisible}
                    vm={vm}
                    onRequestClose={onRequestCloseCostumeLibrary}
                />
                <SoundLibrary
                    visible={soundLibraryVisible}
                    vm={vm}
                    onRequestClose={onRequestCloseSoundLibrary}
                />
                <BackdropLibrary
                    visible={backdropLibraryVisible}
                    vm={vm}
                    onRequestClose={onRequestCloseBackdropLibrary}
                />
            </Box>
        </Box>
    </Box>
);

const spriteShape = PropTypes.shape({
    costume: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        bitmapResolution: PropTypes.number.isRequired,
        rotationCenterX: PropTypes.number.isRequired,
        rotationCenterY: PropTypes.number.isRequired
    }),
    direction: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    rotationStyle: PropTypes.string,
    visibility: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
});

TargetPane.propTypes = {
    backdropLibraryVisible: PropTypes.bool,
    costumeLibraryVisible: PropTypes.bool,
    editingTarget: PropTypes.string,
    onChangeSpriteDirection: PropTypes.func,
    onChangeSpriteName: PropTypes.func,
    onChangeSpriteRotationStyle: PropTypes.func,
    onChangeSpriteVisibility: PropTypes.func,
    onChangeSpriteX: PropTypes.func,
    onChangeSpriteY: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onNewBackdropClick: PropTypes.func,
    onNewSpriteClick: PropTypes.func,
    onRequestCloseBackdropLibrary: PropTypes.func,
    onRequestCloseCostumeLibrary: PropTypes.func,
    onRequestCloseSoundLibrary: PropTypes.func,
    onRequestCloseSpriteLibrary: PropTypes.func,
    onSelectSprite: PropTypes.func,
    soundLibraryVisible: PropTypes.bool,
    spriteLibraryVisible: PropTypes.bool,
    sprites: PropTypes.objectOf(spriteShape),
    stage: spriteShape,
    vm: PropTypes.instanceOf(VM)
};

export default TargetPane;
