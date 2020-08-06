package net.catalyst.alfresco.drawio;

import org.alfresco.web.evaluator.Comparator;

public class FileExtensionComparator implements Comparator {

  @Override
  public boolean compare(Object nodeValue) {

    String filename = (String) nodeValue;
    return filename != null && (filename.endsWith(".drawio") || filename.endsWith(".drawio.png"));
  }

}
