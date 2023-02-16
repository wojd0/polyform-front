// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  fireApi: 'https://polyform-ebf1a-default-rtdb.europe-west1.firebasedatabase.app/',
  myApi: 'http://138.3.255.87:3333/',
  idLength: 6,

  /* form creator vars */
  defaultValues: { //default values for user inputs like defualt question
    question: {
      required: false,
      query: ''
    },
    text: {
      minwords: 0,
      maxwords: 40
    },
    number: {
      minval: 0,
      maxval: 100,
      prefix: '',
      suffix: '',
    },
    multiple: {
      questions: [],
      type: 0
    }
  },
  limitations: { //variables for fixed, not user defined limitations like maximum question length
    question: {
      maxlength: 60,
      minlength: 5
    },
    multiple:{
      minanswers: 2,
      maxanswers: 25,
      minlength: 2,
      maxlength: 45
    },
    text: {
      maxwords: 300,
    },
    number: {
      minval: -(10**10),
      maxval: 10**10,
      maxprefixlen: 20,
      maxsuffixlen: 20
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
