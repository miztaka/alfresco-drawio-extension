package net.catalyst.alfresco.drawio;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class FileExtensionComparatorTest {

  private FileExtensionComparator comparator = new FileExtensionComparator();

  @Test
  public void testRegex() {

    assertTrue(comparator.compare("hoge.drawio"));
    assertTrue(comparator.compare("hoge.drawio.png"));
    assertFalse(comparator.compare("hogexdrawioxpng"));
    assertFalse(comparator.compare("hogexdrawio"));
  }

}
