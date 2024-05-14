<?php
    require_once __DIR__ . '/../services/NewsletterService.class.php';
    require_once __DIR__ . '/../utils.php';


    Flight::set('newsletter_service', new NewsletterService());

    Flight::route('POST /newsletters', function() {
        authenticate();
        $data = Flight::request()->data->getData();
        $newsletter = Flight::get('newsletter_service')->add_newsletters($data);
        Flight::json(
            $newsletter
        );
    });