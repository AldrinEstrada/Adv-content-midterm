interface IWeatherForecast {
    list: [
      {
        main: {
          temp: number;
        };
        weather: [
          {
            main: string;
            description: string;
          }
        ];
        wind: {
          speed: number;
        };
        dt_txt: string;
      }
    ];
  }