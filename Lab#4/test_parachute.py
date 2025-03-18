import unittest
from parachute import ParachuteSytem



class TestParachuteSystem(unittest.TestCase):

    # Testing deploy function with negative speed
    def test_deploy_negative_speed(self):
        with self.assertRaises(ValueError):
            ParachuteSytem.deploy(-1, 100)

    # Testing deploy function with correct speed and altitude
    def test_deploy_successful(self):
        self.assertEqual(ParachuteSytem.deploy(10, 300), "Parachute deployed")

    def test_deploy_altitude_150(self):
        self.assertEqual(ParachuteSytem.deploy(30, 150), "Parachute deployed") #test altitude = 150 exactly


    # TODO 1: Test deploy function with too low altitude
    # Call deploy(30, 100) and assert that the result is "Too low to deploy".
    def test_deploy_too_low_altitude(self):
        self.assertEqual(ParachuteSytem.deploy(30, 100), "Too low to deploy")

    # TODO 2: Test calculate_landing_impact function
    # calculate the landing impact using speed =50, and altitude = 100 and assert that the result is 500.
    def test_calculate_landing_impact(self):
        for speed, altitude, expected in self.landingImpactResults:
            if expected == ValueError:
                with self.assertRaises(ValueError):
                    ParachuteSytem.calculate_landing_impact(speed, altitude)
            else:
                self.assertEqual(ParachuteSytem.calculate_landing_impact(speed, altitude), expected)

    landingImpactResults = [
        (50, 100, 500),
        (-50, 100, ValueError),
        (50, -100, ValueError)
    ]

    # TODO 3: Test is_safe_landing function
    def test_is_safe_landing(self):
        for speed, altitude, expected in self.expectedResults:
            self.assertEqual(ParachuteSytem.is_safe_landing(speed, altitude), expected)
    
    expectedResults = [
        (50, 100, False),
        (4, 10, True),
        (50, 10, False)
    ]

    def test_negative_altitude(self):
        with self.assertRaises(ValueError):
            ParachuteSytem.deploy(10, -100)

    def test_deploy_zero_speed(self):
        self.assertEqual(ParachuteSytem.deploy(0, 170), "Parachute deployed")
    

if __name__ == '__main__':
    unittest.main()