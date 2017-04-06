/**
 * Created by Kevin on 12/7/2016.
 */

(function () {
  'use strict';

  angular
    .module('app.pe-cs-calc')
    .controller('peCalcCtrl', peCalculator);

  peCalculator.$inject = ['dependentVariableNotifierService', '$mdMedia'];

  function peCalculator(dependentVariableNotifierService, $mdMedia) {
    var vm = this;

    vm.$mdMedia = $mdMedia;

    // Initialize defaults
    vm.getBishop = getBishop;
    vm.getRaceText = getRaceText;
    vm.updateBMI = updateBMI;
    vm.calculateScore = calculateScore;

    vm.dilationScore = 0;
    vm.effacementScore = 0;
    vm.stationScore = 0;
    vm.ga = 40;
    vm.race = 'other';
    vm.bmi = 20;
    vm.prior = false;

    vm.dilationOptions = ['CLOSED', '1-2cm', '3-4cm', '&ge;5cm'];
    vm.effacementOptions = ['0-30%', '40-50%', '60-70%', '&ge;80%'];
    vm.stationOptions = ['-3', '-2', '-1, 0', '+1, +2'];

    vm.cm = 160;
    vm.kg = 60;

    initialize();

    function initialize() {
      vm.dvs = dependentVariableNotifierService;

      vm.dvs.add(
        {
          'cm': function () {
            vm.ht = vm.cm / 100;

            updateFtIn();
            updateBMI();
          },
          'ft': function () {
            vm.ht = (vm.ft * 12 + vm.in) * 0.0254;

            vm.cm = Math.round(vm.ht * 100);
            updateBMI();
          },
          'in': function () {
            vm.ht = (vm.ft * 12 + vm.in) * 0.0254;

            vm.cm = Math.round(vm.ht * 100);
            updateBMI();
          },
          'kg': function () {
            vm.wt = vm.kg;

            vm.lbs = Math.round(vm.wt * 2.20462);
            updateBMI();
          },
          'lbs': function () {
            vm.wt = vm.lbs / 2.20462;

            vm.kg = Math.round(vm.wt);
            updateBMI();
          },
          'bmi': function () {
            if (vm.wt >= 0) {
              vm.wt = vm.bmi * (vm.ht * vm.ht);
            }
            vm.kg = Math.round(vm.wt);
            vm.lbs = Math.round(vm.wt * 2.20462);
          }
        }
      );

      vm.dvs.notify('cm');
      vm.dvs.notify('kg');

      vm.references = [
        {
          'source': 'In Progress',
          'accessed': {'date-parts': [[2017, 2, 2]]},
          'id': 'none',
          'title': 'Factors Associated with a Failed Induction in the Setting of Pre-Eclampsia',
          'author': [
            {
              'family': 'Langager',
              'given': 'Amanda'
            },
            {
              'family': 'McKinney',
              'given': 'David'
            },
            {
              'family': 'Boyd',
              'given': 'Heather'
            },
            {
              'family': 'Pfister',
              'given': 'Abbey'
            },
            {
              'family': 'Oswald',
              'given': 'Michael'
            },
            {
              'family': 'Dufendach',
              'given': 'Kevin Reid'
            },
            {
              'family': 'Warshak',
              'given': 'Carri R'
            }
          ],
          'container-title-short': 'In Prog',
          'container-title': 'Submitted for Review',
          'ISSN': '0000-0000',
          'issued': {'date-parts': [[2017]]},
          'page': 'xx-xx',
          'volume': 'xx',
          'issue': 'x',
          'PMID': '00000000',
          'PMCID': 'PMC0000000',
          'DOI': '00.000/AAA.0000000000',
          'type': 'article-journal'
        },
        {
          'source': 'PMC',
          'accessed': {'date-parts': [[2017, 2, 1]]},
          'id': 'aiid:3297470',
          'title': 'Using a Simplified Bishop Score to Predict Vaginal Delivery',
          'author': [
            {
              'family': 'Laughon',
              'given': 'S. Katherine'
            },
            {
              'family': 'Zhang',
              'given': 'Jun'
            },
            {
              'family': 'Troendle',
              'given': 'James'
            },
            {
              'family': 'Sun',
              'given': 'Liping'
            },
            {
              'family': 'Reddy',
              'given': 'Uma M.'
            }
          ],
          'container-title-short': 'Obstet Gynecol',
          'container-title': 'Obstetrics and Gynecology',
          'ISSN': '0029-7844',
          'issued': {'date-parts': [[2011, 4]]},
          'page': '805-811',
          'volume': '117',
          'issue': '4',
          'PMID': '21383643',
          'PMCID': 'PMC3297470',
          'DOI': '10.1097/AOG.0b013e3182114ad2',
          'type': 'article-journal'
        }
      ];
    }

    /**
     * Updates the BMI value when a parameter is changed
     */
    function updateBMI() {
      if (vm.wt <= 0) {
        return;
      }

      vm.bmi = Math.round(vm.wt / (vm.ht * vm.ht));
    }

    function updateFtIn() {
      var inches = vm.ht * 39.3701;
      vm.in = Math.round(inches % 12);
      vm.ft = Math.floor(inches / 12);

      if (vm.in === 12) {
        vm.in = 0;
        vm.ft++;
      }
    }

    /**
     * Calculates the probability of requiring a C-Section
     * @returns {number}
     */
    function calculateScore() {
      var bishop = getBishop();

      var unfavCx = (bishop < 5) ? 0 : 1;

      var delCoef;
      if (34 <= vm.ga && vm.ga < 37) {
        delCoef = 0.2004;
      } else if (30 <= vm.ga && vm.ga < 34) {
        delCoef = 0.9044;
      } else if (vm.ga < 30) {
        delCoef = 2.7657;
      } else {
        delCoef = 0;
      }

      var raceCoef;
      if (vm.race === 'black') {
        raceCoef = 0.3152;
      } else if (vm.race === 'hispanic') {
        raceCoef = 1.0774;
      } else if (vm.race === 'other') {
        raceCoef = 1.6587;
      } else {
        raceCoef = 0;
      }

      var PPBMI = Math.round(vm.bmi * 100) / 100;
      var PriorVagDel = vm.prior ? 1 : 0;

      var exponent = -1.69 - 1.5311 * (unfavCx) + delCoef + raceCoef + 0.035 * (PPBMI) - 1.5355 * (PriorVagDel);
      //var oldFormula = Math.exp(-1.69 - 1.5311 * (unfavCx) + 0.2004 * (delChunk1) + 0.9044 * (delChunk2) +
      // 2.7657 * (delChunk3) + 0.3152 * (Race2) + 1.0774 * (Race3) + 1.6587 * (Race4) + 0.035 * (PPBMI) +
      // -1.5355 * (PriorVagDel)) / (1 + Math.exp(-1.69 - 1.5311 * (unfavCx) + 0.2004 * (delChunk1) +
      // 0.9044 * (delChunk2) + 2.7657 * (delChunk3) + 0.3152 * (Race2) + 1.0774 * (Race3) + 1.6587 * (Race4) +
      // 0.035 * (PPBMI) - 1.5355 * (PriorVagDel)))

      return Math.exp(exponent) / (1 + Math.exp(exponent));
    }

    function getBishop() {
      return (vm.dilationScore + vm.effacementScore + vm.stationScore);
    }
  }

  function getRaceText(race) {
    switch (race) {
      case 'white':
        return 'non-Hispanic white';
      case 'black':
        return 'black';
      case 'hispanic':
        return 'Hispanic';
      default:
        return 'other/unknown';
    }
  }

})();