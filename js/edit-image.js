const uploadForm = document.querySelector('.img-upload__form');
const imagePreview = uploadForm.querySelector('.img-upload__preview');
const buttonMinus = uploadForm.querySelector('.scale__control--smaller');
const buttonPlus = uploadForm.querySelector('.scale__control--bigger');

const fieldScaleImage = uploadForm.querySelector('.scale__control--value');
const listFiltersElement = uploadForm.querySelector('.effects__list');
const sliderEffectsContainer = uploadForm.querySelector('.img-upload__effect-level');
const filterSlider = sliderEffectsContainer.querySelector('.effect-level__slider');
const fieldFilterValue = sliderEffectsContainer.querySelector('.effect-level__value');

let currentEffect = 'none';

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

const updateFilterSlider = (filter) => filterSlider.noUiSlider.updateOptions(updateSliderSettings(filter));

const setChoisenEffect = () => {
  if (currentEffect === 'none') {
    sliderEffectsContainer.classList.add('hidden');
    imagePreview.removeAttribute('style');
  } else {
    sliderEffectsContainer.classList.remove('hidden');
    updateFilterSlider(filters[currentEffect]);
  }
};

const onFilterClick = (evt) => {
  const effectsRadio = evt.target.closest('.effects__radio');

  if (effectsRadio) {
    currentEffect = effectsRadio.value;
    setChoisenEffect();
  }
};

const onSliderUpdate = () => {
  const currentFilter = filters[currentEffect];
  if (currentFilter) {
    const valueUnits = currentFilter.valueUnits;
    imagePreview.style.filter = `${currentFilter.value}(${filterSlider.noUiSlider.get()}${valueUnits})`;
  }

  fieldFilterValue.value = filterSlider.noUiSlider.get();
};

const createFilterSlider = () => {
  noUiSlider.create(filterSlider, updateSliderSettings());

  setChoisenEffect();
  filterSlider.noUiSlider.on('update', onSliderUpdate);
  listFiltersElement.addEventListener('click', onFilterClick);
};

const setScale = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
};

const onButtonMinusClick = () => {
  const scaleValue = parseInt(fieldScaleImage.value.replace('%', ''), 10) - scale.STEP;

  if (scaleValue >= scale.MIN) {
    fieldScaleImage.value = `${scaleValue}%`;
    setScale(scaleValue);
  }
};

const onButtonPlusClick = () => {
  const scaleValue = parseInt(fieldScaleImage.value.replace('%', ''), 10) + scale.STEP;

  if (scaleValue <= scale.MAX) {
    fieldScaleImage.value = `${scaleValue}%`;
    setScale(scaleValue);
  }
};

const editImage = () => {
  createFilterSlider();
  buttonMinus.addEventListener('click', onButtonMinusClick);
  buttonPlus.addEventListener('click', onButtonPlusClick);
};


export { editImage };
