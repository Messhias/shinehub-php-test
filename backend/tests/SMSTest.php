<?php


/**
 * @author Fabio William Conceição
 * @since 1.1
 */
class SMSTest extends TestCase
{
    /**
     * Turn up the tests
     *
     * @access public
     * @static
     * @since 1.1
     */
    public function setUp()
    {
        parent::setUp();
    }

    /**
     * Turn down the tests
     *
     * @access public
     * @static
     * @since 1.1
     */
    public function tearDown()
    {
        parent::tearDown();  // Moving that call to the top of the function didn't work either.
    }

    /**
     * Test the main entry point of application.
     *
     * Return the application version (in that case, lumen version)
     *
     *
     * @return bool the integer of the set mode used. FALSE if foo
     *             foo could not be set.
     *
     * @access public
     * @static
     * @since 1.1
     */
    public function testInit()
    {
        $response = $this->call('GET', '/');

        $this->assertEquals(200, $response->status());
    }

    /**
     * Test the get sms of application.
     *
     *  @var int $number is on brazilian number format
     *
     * @return bool the integer of the set mode used. FALSE if foo
     *             foo could not be set.
     *
     * @access public
     * @static
     * @since 1.1
     */
    public function testCanGetSMSUsingRandomNumber()
    {
        $number = rand(111111111,999999999); //the numbers is are in Brazilian phone numbers format
        $response = $this->call('GET', "sms/{$number}");
        $this->assertEquals(200, $response->status());
        $this->json('GET', "sms/{$number}")
             ->seeJson([
                'code' => 200,
                'completed_at' => date('Y-m-d H:m:i'),
                'statusText' => 'OK',
                'status' => true
             ]);
    }

    /**
     * Test the get sms of application.
     *
     *  @var int $from is on brazilian number format
     *  @var int $to is on brazilian number format
     *
     * @return bool the integer of the set mode used. FALSE if foo
     *             foo could not be set.
     *
     * @access public
     * @static
     * @since 1.1
     */
     public function testCanCreateSMSMessage()
     {
         $from = $this->generateNumbers(rand(111111111,999999999)); //the numbers is are in Brazilian phone numbers format
         $to = $this->generateNumbers(rand(111111111,999999999)); //the numbers is are in Brazilian phone numbers format
         $response = $this->call('POST', "sms", [
             'sms' => [
                 'from' => $from,
                 'to' => $to,
                 'message' => 'Hi, I was made by Unit tests!'
            ]
         ]);
         $this->assertEquals(200, $response->status());
         $this->json('GET', "sms/{$from}")
              ->seeJson([
                 'code' => 200,
                 'completed_at' => date('Y-m-d H:m:i'),
                 'statusText' => 'OK',
                 'status' => true
              ]);
        $this->json('GET', "sms/{$to}")
             ->seeJson([
                 'code' => 200,
                 'completed_at' => date('Y-m-d H:m:i'),
                 'statusText' => 'OK',
                 'status' => true
        ]);
     }

     /**
      * Generate random numbers
      *
      *
      * @return int random number between 111111111 and 99999999
      *
      * @param int $number
      * @access private
      * @since 1.1
      */
     private function generateNumbers($number)
     {
         if ($number === rand(111111111,999999999)) {
             $this->generateNumbers($number);
         }
         return $number;
     }
}
