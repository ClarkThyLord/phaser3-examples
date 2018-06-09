<?php
	header('Content-type: application/json');
	$response = array('success' => true, 'reason' => 'initial response', 'data' => array());

	function dirToArray($dir) {
		$result = array();

		$temp_dir = array_slice(scandir($dir), 2);
		foreach($temp_dir as $index => $name) {
			if (is_dir($dir.DIRECTORY_SEPARATOR.$name)) {
				$result[] = array('name' => $name, 'children' => dirToArray($dir.DIRECTORY_SEPARATOR.$name));
			} else {
				if (strpos($name, '.js') === false) {
					continue;
				}

				$result[] = array('name' => str_replace('.js', '', $name));
			}
		}

		return $result;
	}

	try {
		$response['data']['dump'] = dirToArray('../src/');
	} catch (Exception  $error) {
		$response['success'] = false;
		$response['reason'] = "failed to generate JSON from examples, error: {$error}";
	}


	$response['reason'] = 'successfully generated JSON from examples';

	echo json_encode($response);
?>
