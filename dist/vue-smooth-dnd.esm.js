/**
 * Bundle of: vue-smooth-dnd
 * Generated: 2019-01-26
 * Version: 0.2.8
 */

import SmoothDnD, { dropHandlers, constants } from 'smooth-dnd';

var isArray = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
};

function getTagProps (ctx, tagClasses) {
  var tag = ctx.$props.tag;
  if (tag) {
    if (typeof tag === 'string') {
      var result = { value: tag };
      if (tagClasses) {
        result.props = { class: tagClasses };
      }
      return result
    } else if (typeof tag === 'object') {
      var result$1 = { value: tag.value || 'div', props: tag.props || {} };

      if (tagClasses) {
        if (result$1.props.class) {
          if (isArray(result$1.props.class)) {
            result$1.props.class.push(tagClasses);
          } else {
            result$1.props.class = [tagClasses, result$1.props.class];
          }
        } else {
          result$1.props.class = tagClasses;
        }
      }

      return result$1
    }
  }
  return { value: 'div' }
}

function validateTagProp (tag) {
  if (tag) {
    if (typeof tag === 'string') { return true }
    if (typeof tag === 'object') {
      if (
        typeof tag.value === 'string' ||
        typeof tag.value === 'function' ||
        typeof tag.value === 'object'
      ) {
        return true
      }
    }
    return false
  }
  return true
}

/* eslint-disable curly */

SmoothDnD.dropHandler = dropHandlers.reactDropHandler().handler;
SmoothDnD.wrapChild = function (p) { return p; }; // don't wrap children they will already be wrapped

var mapOptions = function (context) {
  var props = Object.assign({}, context.$props, context.$listeners);
  var options = {};
  if (props.behaviour) { options.behaviour = props.behaviour; }
  if (props.groupName) { options.groupName = props.groupName; }
  if (props.orientation) { options.orientation = props.orientation; }
  if (props.dragHandleSelector)
    { options.dragHandleSelector = props.dragHandleSelector; }
  if (props.nonDragAreaSelector)
    { options.nonDragAreaSelector = props.nonDragAreaSelector; }
  if (props.dragBeginDelay !== undefined)
    { options.dragBeginDelay = props.dragBeginDelay; }
  if (props.animationDuration !== undefined)
    { options.animationDuration = props.animationDuration; }
  if (props.autoScrollEnabled !== undefined)
    { options.autoScrollEnabled = props.autoScrollEnabled; }
  if (props.lockAxis) { options.lockAxis = props.lockAxis; }
  if (props.dragClass) { options.dragClass = props.dragClass; }
  if (props.dropClass) { options.dropClass = props.dropClass; }
  if (props.removeOnDropOut) { options.removeOnDropOut = props.removeOnDropOut; }
  if (props['drag-start']) {
    options.onDragStart = function (params) {
      context.$emit('drag-start', params);
    };
  }
  if (props['drag-end']) {
    options.onDragEnd = function (params) {
      context.$emit('drag-end', params);
    };
  }
  if (props['drop']) {
    options.onDrop = function (dragResult) {
      context.$emit('drop', dragResult);
    };
  }
  if (props.getChildPayload) { options.getChildPayload = props.getChildPayload; }
  if (props.shouldAnimateDrop)
    { options.shouldAnimateDrop = props.shouldAnimateDrop; }
  if (props.shouldAcceptDrop) { options.shouldAcceptDrop = props.shouldAcceptDrop; }
  if (props['drag-enter']) {
    options.onDragEnter = function () {
      context.$emit('drag-enter');
    };
  }
  if (props['drag-leave']) {
    options.onDragLeave = function () {
      context.$emit('drag-leave');
    };
  }
  if (props.getGhostParent) { options.getGhostParent = props.getGhostParent; }

  if (props['drop-ready']) {
    options.onDropReady = function (dropResult) {
      context.$emit('drop-ready', dropResult);
    };
  }
  return options
};

var Container = {
  name: 'Container',
  mounted: function mounted () {
    this.containerElement = this.$refs.container || this.$el;
    this.container = SmoothDnD(this.containerElement, mapOptions(this));
  },
  updated: function updated () {
    if (
      this.$refs.container !== this.containerElement &&
      this.$el !== this.containerElement
    ) {
      if (this.container) {
        this.container.dispose();
      }
      this.containerElement = this.$refs.container || this.$el;
      this.container = SmoothDnD(this.containerElement, mapOptions(this));
    }
  },
  destroyed: function destroyed () {
    if (this.container) {
      this.container.dispose();
    }
  },
  props: {
    behaviour: String,
    groupName: String,
    orientation: String,
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    dragBeginDelay: Number,
    animationDuration: Number,
    autoScrollEnabled: { type: Boolean, default: true },
    lockAxis: String,
    dragClass: String,
    dropClass: String,
    removeOnDropOut: { type: Boolean, default: false },
    'drag-start': Function,
    'drag-end': Function,
    drop: Function,
    getChildPayload: Function,
    shouldAnimateDrop: Function,
    shouldAcceptDrop: Function,
    'drag-enter': Function,
    'drag-leave': Function,
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
    getGhostParent: Function,
    'drop-ready': Function,
  },
  render: function (createElement) {
    var tagProps = getTagProps(this);
    return createElement(
      tagProps.value,
      Object.assign({}, { ref: 'container' }, tagProps.props),
      this.$slots.default
    )
  }
};

var wrapChild = function (createElement, ctx) {
  var tagProps = getTagProps(ctx, constants.wrapperClass);
  return createElement(
    tagProps.value,
    Object.assign({}, tagProps.props),
    ctx.$slots.default
  )
};

var Draggable = {
  name: 'Draggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div'
    }
  },
  render: function (createElement) {
    return wrapChild(createElement, this)
  }
};

export { Container, Draggable };
