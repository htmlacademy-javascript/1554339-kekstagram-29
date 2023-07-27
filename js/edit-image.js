const filters = {

  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    value: 'grayscale',
    valueUnits: ''
  },

  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    value: 'sepia',
    valueUnits: ''
  },

  marvin: {
    min: 0,
    max: 100,
    step: 1,
    value: 'invert',
    valueUnits: '%'
  },

  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    value: 'blur',
    valueUnits: 'px'
  },

  heat: {
    min: 0,
    max: 3,
    step: 0.1,
    value: 'brightness',
    valueUnits: ''
  }

};

const scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

const uploadFormElement = document.querySelector('.img-upload__form');
const imagePreviewElement = uploadFormElement.querySelector('.img-upload__preview');
const buttonMinusElement = uploadFormElement.querySelector('.scale__control--smaller');
const buttonPlusElement = uploadFormElement.querySelector('.scale__control--bigger');

const fieldScaleImageElement = uploadFormElement.querySelector('.scale__control--value');
const listFiltersElement = uploadFormElement.querySelector('.effects__list');
const sliderEffectsContainerElement = uploadFormElement.querySelector('.img-upload__effect-level');
const filterSliderElement = sliderEffectsContainerElement.querySelector('.effect-level__slider');
const fieldFilterValueElement = sliderEffectsContainerElement.querySelector('.effect-level__value');

let currentEffect = 'none';

const updateSliderSettings = (filterName) => {
  const sliderSetting = {
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value)
    }
  };

  if (filterName) {
    sliderSetting.range = {
      min: filterName.min,
      max: filterName.max
    };
    sliderSetting.step = filterName.step;
    sliderSetting.start = filterName.max;
  } else {
    sliderSetting.range = {
      min: 0,
      max: 100
    };
    sliderSetting.step = 1;
    sliderSetting.start = 100;
  }

  return sliderSetting;
};

const updateFilterSlider = (filter) => filterSliderElement.noUiSlider.updateOptions(updateSliderSettings(filter));

const setEffect = () => {
  if (currentEffect === 'none') {
    sliderEffectsContainerElement.classList.add('hidden');
    imagePreviewElement.removeAttribute('style');
  } else {
    sliderEffectsContainerElement.classList.remove('hidden');
    updateFilterSlider(filters[currentEffect]);
  }
};

const onFilterClick = (evt) => {
  const effectsRadio = evt.target.closest('.effects__radio');

  if (effectsRadio) {
    currentEffect = effectsRadio.value;
    setEffect();
  }
};

const onSliderUpdate = () => {
  const currentFilter = filters[currentEffect];
  if (currentFilter) {
    const valueUnits = currentFilter.valueUnits;
    imagePreviewElement.style.filter = `${currentFilter.value}(${filterSliderElement.noUiSlider.get()}${valueUnits})`;
  }

  fieldFilterValueElement.value = filterSliderElement.noUiSlider.get();
};

const setScale = (value) => {
  imagePreviewElement.style.transform = `scale(${value / 100})`;
  fieldScaleImageElement.removeAttribute('value');
  fieldScaleImageElement.setAttribute('value', `${value}%`);
};

const onButtonMinusClick = () => {
  const scaleValue = parseInt(fieldScaleImageElement.value.replace('%', ''), 10) - scale.STEP;

  if (scaleValue >= scale.MIN) {
    fieldScaleImageElement.removeAttribute('value');
    fieldScaleImageElement.setAttribute('value', `${scaleValue}%`);
    setScale(scaleValue);
  }
};

const onButtonPlusClick = () => {
  const scaleValue = parseInt(fieldScaleImageElement.value.replace('%', ''), 10) + scale.STEP;

  if (scaleValue <= scale.MAX) {
    fieldScaleImageElement.removeAttribute('value');
    const value = `${scaleValue}%`;
    fieldScaleImageElement.setAttribute('value', value);
    setScale(scaleValue);
  }
};

const reset = () => {
  setScale(100);
  currentEffect = 'none';
  setEffect();
  filterSliderElement.noUiSlider.destroy();
};

const createFilterSlider = () => {
  noUiSlider.create(filterSliderElement, updateSliderSettings());

  setEffect();
  filterSliderElement.noUiSlider.on('update', onSliderUpdate);
  listFiltersElement.addEventListener('click', onFilterClick);
};

const editImage = () => {
  createFilterSlider();
  buttonMinusElement.addEventListener('click', onButtonMinusClick);
  buttonPlusElement.addEventListener('click', onButtonPlusClick);
};


export { editImage, reset };
