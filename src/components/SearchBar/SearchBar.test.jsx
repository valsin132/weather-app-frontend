import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const mockHandleCitySearch = jest.fn();
  const mockFetchWeatherData = jest.fn();
  const mockCitySuggestions = [
    { name: 'Vilnius', country: 'Lithuania', lat: 54.6872 },
    { name: 'Kaunas', country: 'Lithuania', lat: 54.8972 },
  ];

  test('renders without crashing', () => {
    render(
      <SearchBar
        city=""
        handleCitySearch={mockHandleCitySearch}
        citySuggestions={[]}
        fetchWeatherData={mockFetchWeatherData}
      />,
    );
    expect(screen.getByPlaceholderText('Enter a city')).toBeInTheDocument();
  });

  test('displays entered city name', () => {
    render(
      <SearchBar
        city="Vilnius"
        handleCitySearch={mockHandleCitySearch}
        citySuggestions={[]}
        fetchWeatherData={mockFetchWeatherData}
      />,
    );
    expect(screen.getByDisplayValue('Vilnius')).toBeInTheDocument();
  });

  test('calls handleCitySearch when typing', async () => {
    render(
      <SearchBar
        city=""
        handleCitySearch={mockHandleCitySearch}
        citySuggestions={[]}
        fetchWeatherData={mockFetchWeatherData}
      />,
    );

    const input = screen.getByPlaceholderText('Enter a city');
    await userEvent.type(input, 'Vilnius');

    expect(mockHandleCitySearch).toHaveBeenCalledTimes(7);
    expect(mockHandleCitySearch).toHaveBeenCalledWith('Vilnius');
  });

  test('shows suggestions when typing', async () => {
    render(
      <SearchBar
        city="Vi"
        handleCitySearch={mockHandleCitySearch}
        citySuggestions={mockCitySuggestions}
        fetchWeatherData={mockFetchWeatherData}
      />,
    );

    expect(screen.getByText('Vilnius, Lithuania')).toBeInTheDocument();
    expect(screen.getByText('Kaunas, Lithuania')).toBeInTheDocument();
  });

  test('calls fetchWeatherData when a suggestion is clicked', async () => {
    render(
      <SearchBar
        city="Vi"
        handleCitySearch={mockHandleCitySearch}
        citySuggestions={mockCitySuggestions}
        fetchWeatherData={mockFetchWeatherData}
      />,
    );

    const suggestion = screen.getByText('Vilnius, Lithuania');
    await userEvent.click(suggestion);

    expect(mockFetchWeatherData).toHaveBeenCalledWith(mockCitySuggestions[0]);
  });

  test('hides suggestions when clicking outside', async () => {
    render(
      <SearchBar
        city="Vi"
        handleCitySearch={mockHandleCitySearch}
        citySuggestions={mockCitySuggestions}
        fetchWeatherData={mockFetchWeatherData}
      />,
    );

    const suggestion = screen.getByText('Vilnius, Lithuania');
    expect(suggestion).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(suggestion).not.toBeInTheDocument();
  });
});